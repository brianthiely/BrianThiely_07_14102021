module.exports = {
    checkEmail: function (value) {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regexEmail.test(value)
    },
    checkPassword: function (value) {
        //8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial
        const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
        return regexPassword.test(value)
    },
    checkUsername: function (value) {
        const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        return regexUsername.test(value)
    }
}


