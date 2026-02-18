import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log({
    "client name": name,
    "client email": email,
    "client passwords": password,
  });
  try {
    // check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    // generate token
    const token = generateToken(newUser.id, res);
    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if the user exist
    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (!userExist) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    // check if password match
    const isValidPassword = await bcrypt.compare(password, userExist.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    // generate token
    // store token only when you need to sent back in the json response
    // const token = generateToken(userExist.id, res);

    generateToken(userExist.id, res);
    res.status(200).json({
      status: "success",
      message: "User logged in successfully!",
      data: {
        user: {
          id: userExist.id,
          name: userExist.name,
          email: userExist.email,
        },
        // token,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
