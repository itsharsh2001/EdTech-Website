import jwt from 'jsonwebtoken'

export const createJwtToken = (email)=>{
    const token = jwt.sign(
        { email: email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return token;
}
