exports. userRegisterValidator = (req,res,next) => {
    req.check("Contect","Phone number is Required").notEmpty();
    req.check ("Contect", "phone should only contain numeric value ").isNumeric();
    req.check("Contect").isLength({ min: 10, max: 15 }).withMessage("phone number length is not Sufficient");

    //email valid
    req.check("email","Email is required").notEmpty();
    req.check("email","Invalid Email").isEmail();

    //check password
    req.check("password","password is Required").notEmpty();
    req.check ("password").isLength({min:6}).withMessage("password must contain at least 6 character");
    req.check("password", "password must contain one uppercase letter, one lowercase letter, one number, and one special symbol")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "i");

    //check error
    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map((err) => err.msg)[0];

        return res.status(400).json({
            error : firstError,
        });
    }
    next();
};