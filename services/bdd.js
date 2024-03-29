import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('pudetune.db')

const setupDatabase = async () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS depenses (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nom VARCHAR(255) NOT NULL,
                montant REAL NOT NULL,
                categorie VARCHAR(100) NOT NULL,
                date DATETIME DEFAULT current_timestamp
             )`,
            [],
            () => {
                console.log("La création de la table 'depenses' s'est bien passée.")
            },
            (_, error) => {
                console.error("Un problème est survenu lors de la création de la table 'depenses'", error)
            }
        )
    })
}

const findAll = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM depenses ORDER BY date DESC`,

                [],

                (_, resultSet) => {
                    resolve(resultSet.rows._array)
                },

                (_, error) => {
                    console.error("Erreur lors de la récupération des dépense.", error)
                    reject(error)
                }
            )
        })
    });
}

const create = async (nom, montant, categorie, date) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO depenses VALUES (null, ?, ?, ?, ?)`,
                [nom, montant, categorie, date],
                (_, resultSet) => {
                    resolve(resultSet.insertId)
                },
                (_, error) => {
                    console.error("Erreur lors de la récupération des dépenses.", error)
                    reject(error)
                }
            )
        })
    });
}

const remove = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM depenses WHERE id = ?`,
                [id],
                (_, resultSet) => {
                    console.log("Element supprimé")
                    resolve(true)
                },
                (_, error) => {
                    console.error("Erreur lors de la suppression de la dépense.", error)
                    reject(error)
                }
            )
        })
    });
}

export {
    db,
    setupDatabase,
    findAll,
    create,
    remove
}
