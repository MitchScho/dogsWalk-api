//--------------------------------------------------------------------------------------------------
//--- Model Associations ---
// This file defines associations that require both models to be loaded
// It should be called after all models are imported
//--------------------------------------------------------------------------------------------------

const User = require('./models/User');
const Dog = require('./models/Dog');

// Define User.hasMany(Dog) association to avoid circular dependency
// This is called after both models are fully loaded
try {
  if (!User.associations || !User.associations.dogs) {
    User.hasMany(Dog, { foreignKey: 'userId' });
  }
} catch (err) {
  console.warn('Could not define User.hasMany(Dog) association:', err.message);
}

module.exports = { User, Dog };
