const Food = require('./../models/foodModel');

exports.createFood = (req, res) => {
  try {
    const { foodName, menuName, price, description } = req.body;
    Food.findOne({ foodName: foodName }).then((existingFood) => {
      if (existingFood) {
        res.status(422).json({ error: 'Food already exists' });
      } else {
        const createdFood = new Food({
          foodName: foodName,
          menuName: menuName,
          description: description,
          price: price,
        });
        createdFood.save().then((doc) => {
          res.status(200).json({ message: 'Food created successfully' });
        });
      }
    });
  } catch {
    res.status(500).json({ error: 'Food creation failed' });
  }
};

exports.getFoods = (req, res) => {
  try {
    Food.find()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => {
        res.status(404).json({ error: 'Request failed' });
      });
  } catch {
    res.status(404).json({ error: 'Request failed' })
  }
};

exports.editFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { foodName, menuName, price, description } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      {
        foodName: foodName || undefined,
        menuName: menuName || undefined,
        description: description,
        price: price,
      },
      { new: true, runValidators: true }
    );

    if (!updatedFood) {
      res.status(404).json({ error: 'Food not found' });
    }

    res.status(200).json(updatedFood);
  } catch {
    res.status(500).json({ error: 'Request failed' });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    Food.findByIdAndDelete(id)
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
