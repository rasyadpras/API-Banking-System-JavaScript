class Register {
    constructor(
        email,
        password,
        full_name,
        gender,
        birth_date,
        identity_type,
        identity_number,
        address,
        city,
        province,
        country,
        phone_number
    ) {
        this.email = email;
        this.password = password;
        this.full_name = full_name;
        this.gender = gender;
        this.birth_date = birth_date;
        this.identity_type = identity_type;
        this.identity_number = identity_number;
        this.address = address;
        this.city = city;
        this.province = province;
        this.country = country;
        this.phone_number = phone_number;
    }
}

module.exports = Register;
