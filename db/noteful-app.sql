DROP TABLE IF EXISTS notes;
SELECT CURRENT_DATE;

CREATE TABLE notes (
    id serial PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    created timestamp default CURRENT_TIMESTAMP
);

ALTER SEQUENCE notes_id_seq
RESTART WITH 1000;

INSERT INTO notes 
(title, content)
VALUES 
('5 life lessons learned from cats', 'Lorem ipsum dolor sit amet.'),
('What the government doesn''t want you to know about cats', 'They''re cute!'),
('The most boring article about cats you''ll ever read', 'Boring article'),
('7 things lady gaga has in common with cats', 'Posuere sollicitudin aliquam ultrices sagittis'),
('The most incredible article about cats you''ll ever read', 'Here it is.'),
('10 ways cats can help you live to 100', 'Posuere sollicitudin aliquam ultrices sagittis orci a.'),
('9 reasons you can blame the recession on cats', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
('10 ways marketers are making you addicted to cats', 'Posuere sollicitudin aliquam ultrices sagittis orci a.'),
('11 ways investing in cats can make you a millionaire', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');