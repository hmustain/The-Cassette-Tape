const router = require("express").Router();
const { User } = require("../../models");

// post new user
router.post("/", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userData = await User.create({
      email,
      password,
      name,
      role
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.userName=userData.name
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// post route for login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.userName=userData.name
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// post route for logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
