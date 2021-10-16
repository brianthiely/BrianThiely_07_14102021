const sql = require('./db');

//constructeur
const userSchema = function(user) {
    this.mail = user.mail;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.role = user.role;
    this.picture = user.picture;
    this.isAdmin = user.isAdmin;
    
};

//rechercher l'utilisateur par l'id
userSchema.findById = (idUSERS, result)=>{
    sql.query(`SELECT * FROM users WHERE idUSERS = ${idUSERS} `,(err, res)=>{ //${user_id}
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("utilisateur trouvé: ", res[0]);
            result(null, res[0]);
            return;
        }
        //utilisateur introuvable 
        result({ kind: "not_found" }, null);
    })
};

//Selectionner tout les users

userSchema.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) =>{
        if (err) {
            console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("utilisateurs: ", res);
        result(null, res);
        
    });
};

module.exports = userSchema;
