const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

/// Users
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1`, [email])
  .then(res => res.rows[0] || null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1`, [id])
  .then(res => res.rows[0] || null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *`, [user.name, user.email, user.password])
  .then(res => res.rows[0] || null);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 */

const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];
  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` WHERE city ILIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
		queryParams.push(options.owner_id);
		queryString += ` AND owner_id = $${queryParams.length} `;
	} 

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`)
    queryString += ` AND cost_per_night >= $${queryParams.length}`
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`)
    queryString +=` AND cost_per_night <= $${queryParams.length}`
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    GROUP BY properties.id
    HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  } else {
    queryString += `
      GROUP BY properties.id`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
*/
const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`,
  [`${property.owner_id}`, `${property.title}`, `${property.description}`, `${property.thumbnail_photo_url}`, `${property.cover_photo_url}`, `${property.cost_per_night}`, `${property.street}`, `${property.city}`, `${property.province}`, `${property.post_code}`, `${property.country}`, `${property.parking_spaces}`, `${property.number_of_bathrooms}`, `${property.number_of_bedrooms}`])
  .then(res => {
    res.rows;
  })
}
exports.addProperty = addProperty;
