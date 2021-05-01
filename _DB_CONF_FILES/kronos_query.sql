insert into roles (id, role_type) values (1, 'ADMIN_ROLE');
insert into roles (id, role_type) values (2, 'USER_ROLE');

insert into roles (id, auth_type) values (1, 'INTERNAL');
insert into roles (id, auth_type) values (2, 'GOOGLE');
insert into roles (id, auth_type) values (3, 'FACEBOOK');

insert into emotions (name, code) values ('ALARMED', 0);
insert into emotions (name, code) values ('HAPPY', 1);
insert into emotions (name, code) values ('TIRED', 2);
insert into emotions (name, code) values ('SAD', 3);