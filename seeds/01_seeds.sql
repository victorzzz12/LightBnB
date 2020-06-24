INSERT INTO users (id, name, email, password)
VALUES (1, 'Harry Potter', 'pottermore@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Ron Weasley', 'ronthebomb@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Hermione Granger', 'smartypants@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(4, 'Luna Lovegood', 'canyouseethat@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(5, 'Neville Longbottom', 'ahhhhh@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces , number_of_bathrooms , number_of_bedrooms, country , street, city, province, post_code, active)
VALUES (1, 1, 'Dumbledores Office', 'Available because he died', 'https://www.pinterest.ca/pin/515310382334043444/', 'https://www.pinterest.ca/pin/515310382334043444/', 500, 0, 1, 1, 'England', 'Dumbledore Road', 'Hogwarts', 'N/A', 'Hogwarts PO Box', TRUE),
(2, 2, 'The Burrow', 'Full of gingers', 'https://www.artstation.com/artwork/XlZ5w', 'https://www.artstation.com/artwork/XlZ5w', 1000, 100, 4, 2, 'England', 'Weasley Boulevard', 'Hogwarts', 'N/A', 'Weasley PO Box', TRUE),
(3, 3, 'Gryffindor Common Room', 'Filled with dementors', 'https://www.pinterest.com/pin/256634878740776891/', 'https://www.pinterest.com/pin/256634878740776891/', 200, 0, 4, 20, 'England', 'The Fat Lady Painting', 'Hogwarts', 'N/A', 'The Fat Lady PO Box', FALSE),
(4, 4, 'Lovegood House', 'Destroyed By Death Eaters', 'https://www.pinterest.com/pin/171277592054621498/', 'https://www.pinterest.com/pin/171277592054621498/', 300, 0, 2, 2, 'England', 'Lovegood Badlands', 'Lovegood Drive', 'N/A', 'Lovegood PO Box', FALSE),
(5, 1, 'Dursley House', 'Aggressive and disrespectful people; Bedroom available under staircase', 'https://www.pinterest.com/pin/171277592054621498/', 'https://www.pinterest.com/pin/171277592054621498/', 2000, 2, 3, 1, 'England', 'London', '4 Privet Drive', 'Surrey', 'Dursley PO Box', TRUE);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 5, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 2, 2, 5, 'Very friendly lot! Could tell they love each other and their guests. Would love to visit again!'),
(2, 1, 1, 1, 4, 'There is a phoenix flying around and its very spacious. Only problem is it seems like a dead person was here not long ago. That was why it was only four stars'),
(3, 3, 5, 3, 2, 'Terrible people; Strongly sugggest everyone to stay away from them. Cramped room under the staircase. Just horrible!');