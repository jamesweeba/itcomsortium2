let pg = require("pgconnect-lite");
let { getProirityByName } = require("../priority/service");
let { getAstatusByName } = require("../status/service");
let { getCount } = require("../utils/utils");


function createTask(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `insert into tasks(title,postedby_id,status_id,priority_id,description,assinged_to) values($1,$2,$3,$4,$5,$6) returning *`;
            let prority = await getProirityByName(dbConnection);
            let status = await getAstatusByName(dbConnection);
            let { id: priorityId } = prority
            let { id: statusId } = status;
            let { title, userId, description } = payload;
            let params = [title, userId, statusId, priorityId, description, userId];
            let query = await pg.insert(dbConnection, sql, params);
            return resolve(query.data)
        } catch (err) {
            return reject(err)
        }

    })

}

function getTasks(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let { limit, page, user } = payload;
            let transformedSqlFields = [];
            let userRole = user;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;
            let totalTaskCount = await getCount("tasks", dbConnection);
            let totalPages = Math.ceil(totalTaskCount.count / limit);

            delete payload.limit;
            delete payload.page;
            delete payload.user;

            let modifiedPayload = modifySearchPayload(payload);
            let sqlField = ["title", "s.name", "p.name"];
            let fltererdFilters = [...transformedSqlFields].filter(item => item != "status" && item != "priority");

            let sql = `select t.*,s.name as status,p.name as prority from tasks t 
                        join status s  on t.status_id::text=s.id::text
                        join priorities p on t.priority_id::text=p.id::text
                        ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
            let params = [limit, offset];
            let length = sqlField.length;

            if (length > 0) {
                sql = `select t.*,s.name as status,p.name as priority  from tasks t 
                      join status s  on t.status_id::text=s.id::text
                      join priorities p on t.priority_id::text=p.id::text
                      where ` + sqlField.map((v, i) => v + `=$` + (i + 1)).join(` and `) +
                    ` LIMIT $${length + 1} OFFSET $${length + 2}`;
                params = sqlField.map(field_name => modifiedPayload[field_name]);
                params.push(limit, offset)
            }

            if (userRole.role != "admin") {
                sql = `select t.*,s.name as status,p.name as prority from tasks t 
                join status s  on t.status_id::text=s.id::text
                join priorities p on t.priority_id::text=p.id::text
                where t.assinged_to='${user.id}'
                ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
                let params = [limit, offset];
                let length = sqlField.length;

                if (length > 0) {
                    sql = `select t.*,s.name as status,p.name as priority  from tasks t 
                         join status s  on t.status_id::text=s.id::text
                         join priorities p on t.priority_id::text=p.id::text
                         where  t.assinged_to='${user.id}' and ` + sqlField.map((v, i) => v + `=$` + (i + 1)).join(` and `) +
                        ` LIMIT $${length + 1} OFFSET $${length + 2}`;
                    params = sqlField.map(field_name => modifiedPayload[field_name]);
                    params.push(limit, offset)
                }

            }

            let query = await pg.fetch(dbConnection, sql, params);
            let { data } = query;
            let { items, count } = data;
            if (count < 1) {
                return resolve(null);

            }

            console.log("mmmmmmmmmmmmmmmmmmmmm")

            console.log(count);
            console.log("mmmmmmmmmmmmmmmmmmmmm")
            let results = {
                page,
                limit,
                totalPages,
                totalTasks: parseInt(totalTaskCount.count),
                items
            }

            return resolve(results)

        } catch (err) {
            return reject(err)

        }
    })

}

function getTask(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {

            // console.log("pppppppppppppppppppppppppppppppppppp",payload);
            // process.exit(1)
            let { id, user } = payload;
            let { id: userId, role } = user;
            let sql = `select t.*,s.name as status,p.name as priority from tasks t join  status s 
                   on t.status_id::text=s.id::text 
                   join priorities p on t.priority_id::text=p.id::text
                   where t.id::text=$1::text`;

            if (role != "admin") {
                sql = `select t.*,s.name as status,p.name as priority from tasks t join  status s 
                on t.status_id::text=s.id::text 
                join priorities p on t.priority_id::text=p.id::text
                where t.id::text=$1::text and t.assinged_to::text=${userId}::text`;
            }

            let params = [id];
            let query = await pg.fetchOne(dbConnection, sql, params);
            let { data } = query;
            return resolve(data)

        } catch (err) {
            return reject(err)

        }

    })
}

function updateTask(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let modifiedPayload = modifyUpdatePayload(payload)
            let sqlFields = ["title", "description", "status_id", "priority_id", "assinged_to","state"];
            let sql = `update tasks set ` + sqlFields.map((v, i) => v + `=$` + (i + 1)).join(`,`) + ` where id=$` + (sqlFields.length + 1) + ` returning id`;
            let params = sqlFields.map(item => modifiedPayload[item]);
            params.push(payload.id)
            let update = await pg.update(dbConnection, sql, params);
            let { data } = update;
            let { items } = data;
             let aTask = await getTask(payload, dbConnection);
            return resolve(aTask);
        } catch (err) {
            return reject(err)
        }

    })
}

function deleteTask(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let { id } = payload;
            console.log(id);
            console.log("llllllllllllllllllllllllllllllllllllll")
            let sql = `update tasks set state='D' where id=$1`;
            let params = [id];
            let del = await pg.update(dbConnection, sql, params);
            console.log(del);
            console.log("llllllllllllllllllllllllllllllllllllll")
            return resolve({ message: "Deleted Successfully" })
        } catch (err) {
            console.log(err)
            return reject(err)
        }
    })

}


function modifyUpdatePayload(payload) {
    if (payload.hasOwnProperty('statusId')) {
        payload.status_id = payload.statusId;
        delete payload.statusId;
    }
    if (payload.hasOwnProperty('priorityId')) {
        payload.priority_id = payload.priorityId;
        delete payload.priorityId;
    }

    if (payload.hasOwnProperty('priorityId')) {
        payload.priority_id = payload.priorityId;
        delete payload.priorityId;
    }

    if (payload.hasOwnProperty('assingedTo')) {
        payload.assinged_to = payload.assingedTo;
        delete payload.assingedTo;
    }
    return payload;
}


function modifySearchPayload(payload) {
    if (payload.hasOwnProperty('status')) {
        payload["s.name"] = payload.status;
        delete payload.status;
    }
    if (payload.hasOwnProperty('priority')) {
        payload["p.name"] = payload.priority;
        delete payload.priority;
    }
    return payload;

}


module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}