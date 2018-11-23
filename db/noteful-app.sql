-- psql -U dev -d dev-noteful-app -f ./db/noteful-app.sql
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;
-- SELECT CURRENT_DATE;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

INSERT INTO folders (name) VALUES
  ('Archive'),
  ('Drafts'),
  ('Personal'),
  ('Work');

CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

ALTER SEQUENCE notes_id_seq
RESTART WITH 1000;

INSERT INTO notes 
(title, content, folder_id)
VALUES 
('5 life lessons learned from cats', 'Lorem ipsum dolor sit amet.', 100),
('What the government doesn''t want you to know about cats', 'They''re cute!', 101),
('The most boring article about cats you''ll ever read', 'Boring article', 102),
('7 things lady gaga has in common with cats', 'Posuere sollicitudin aliquam ultrices sagittis', 103),
('The most incredible article about cats you''ll ever read', 'Here it is.', 100),
('10 ways cats can help you live to 100', 'Posuere sollicitudin aliquam ultrices sagittis orci a.', 103),
('9 reasons you can blame the recession on cats', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 100),
('10 ways marketers are making you addicted to cats', 'Posuere sollicitudin aliquam ultrices sagittis orci a.', 100),
('11 ways investing in cats can make you a millionaire', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 100);

