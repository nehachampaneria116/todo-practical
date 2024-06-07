
/**
 * EMAIL REGEX
 */
var kEmailRegex = /\S+@\S[a-z]+\.\S+/;

/**
 * PASSWORD REGEX
 */
var kPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,200}$/



/**
 * USERNAME REGEX
 */
var kUsername = /(?=.*[A-Za-z])(?!^\d+$)^.+$/


module.exports = {
    kEmailRegex,
    kPasswordRegex,
    kUsername
}