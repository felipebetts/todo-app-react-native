import SQLite from 'react-native-sqlite-storage'

SQLite.enablePromise(true)

export const getDb = async () => {
  return SQLite.openDatabase({
    name: 'todolist.db',
    location: 'default'
  })
}

export const init = async () => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql(
      `create table if not exists lists (id integer primary key not null, name text, image text)`
    )
    tx.executeSql(
      `create table if not exists tasks (id integer primary key not null, list_id integer, subject text, done integer)`
    )
  })
}

interface Task {
  list_id: number
  subject: string
  done: number // this needs to be 0(false) or 1(true)
}

export const createTask = async (task: Task) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql(
      'insert into tasks (list_id, subject, done) values (?, ?, ?)',
      [task.list_id, task.subject, task.done]
    )
  })
}

export const deleteTask = async (id: number) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('delete from tasks where id = ?', [id])
  })
}

export const updateTaskSubject = async (id: number, subject: string) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('update tasks set subject = ? where id = ?', [subject, id])
  })
}

export const updateTaskDone = async (id: number, done: number) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('update tasks set done = ? where id = ?', [done, id])
  })
}

export const getListTasks = async (list_id: number) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('select * from tasks where list_id = ?', [list_id])
  })
}

interface List {
  name?: string
  image?: string | null
}

export const createList = async (list: List) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('insert into lists (name, image) values (?, ?)', [
      list.name,
      list.image
    ])
  })
}

export const deleteList = async (id: number) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('delete from lists where id = ?', [id])
    tx.executeSql('delete from tasks where list_id = ?', [id])
  })
}

export const getList = async (id: number) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('select * from lists where id = ?', [id])
  })
}

export const updateListName = async (id: number, name: string) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('update lists set name = ? where id = ?', [name, id])
  })
}

export const updateListImage = async (id: number, image: string) => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('update lists set image = ? where id = ?', [image, id])
  })
}

export const getLists = async () => {
  const db = await getDb()
  return db.transaction(tx => {
    tx.executeSql('select * from lists')
  })
}
