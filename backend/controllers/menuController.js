const Menu = require('./../models/menuModel');

exports.createMenu = (req, res) => {
  try {
    const { menuName } = req.body;
    Menu.findOne({ menuName: menuName }).then((existingMenu) => {
      if (existingMenu) {
        res.status(422).json({ error: 'Menu already exists' });
      } else {
        const createdMenu = new Menu({ menuName: menuName });
        createdMenu.save().then((doc) => {
          res.status(200).json({ message: 'Menu created successfully' });
        });
      }
    });
  } catch {
    res.status(500).json({ error: 'Menu creation failed' });
  }
};

exports.getMenus = (req, res) => {
  try {
    Menu.find()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => {
        res.status(404).json({ error: 'Request failed' });
      });
  } catch {
    res.status(404).json({ error: 'Request failed' });
  }
};

exports.editMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { menuName } = req.body;

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { menuName: menuName || undefined },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json(updatedMenu);
  } catch {
    res.status(500).json({ error: 'Request failed' });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    Menu.findByIdAndDelete(id)
      .then((doc) => {
        res.status(200).json({ message: 'Category successfully deleted' });
      })
      .catch((error) => {
        res.status(404).json({ error: 'Request failed' });
      });
  } catch {
    res.status(404).json({ error: 'Request failed' });
  }
};
