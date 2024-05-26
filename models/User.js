const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Require the configured Sequelize instance

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(50), // Limiting the username length
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Validation to ensure email format
        }
    },
    password: {
        type: DataTypes.STRING, // Ensure to store hashed passwords only
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'), // Status can help manage user states
        defaultValue: 'active'
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'superadmin'), // Role management for authorization
        defaultValue: 'user'
    },
    lastLogin: {
        type: DataTypes.DATE, // Track when the user last logged in
        defaultValue: DataTypes.NOW
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    // Model options
    tableName: 'users',
    timestamps: true // Sequelize manages createdAt and updatedAt fields automatically
});
module.exports = User;