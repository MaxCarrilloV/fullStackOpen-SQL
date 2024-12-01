create table blogs(
    id serial primary key, 
    author text, 
    url text not null, 
    title text not null, 
    likes integer default 0
);

insert into blogs (author, url, title) values ('shake','https://www.shake.com/','a new take on dating');

insert into blogs (author, url, title) values ('dates','https://www.dates.com/','a new date');
