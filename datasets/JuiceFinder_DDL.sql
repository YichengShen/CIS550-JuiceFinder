CREATE TABLE restaurants
(
    business_id  VARCHAR(30)  NOT NULL PRIMARY KEY,
    name         VARCHAR(70)  NOT NULL,
    address      VARCHAR(150) NULL COMMENT 'Could be food truck without a street name',
    city         VARCHAR(60)  NOT NULL,
    state        VARCHAR(5)   NOT NULL,
    postal_code  VARCHAR(8)   NOT NULL,
    location     POINT        NOT NULL SRID 4326,
    stars        FLOAT        NOT NULL,
    review_count INT          NOT NULL,
    attributes   JSON         NOT NULL COMMENT 'JSON-like. E.g. ''RestaurantsDelivery'' : ''False''',
    categories   VARCHAR(600) NOT NULL COMMENT 'Comma-separated categories. E.g. Restaurants, Bubble Tea',
    hours        JSON         NOT NULL COMMENT 'Working hours. E.g. ''Monday'': ''7:0-20:0''',
    SPATIAL INDEX (location)
);
CREATE INDEX idx_star ON restaurants (stars);
CREATE FULLTEXT INDEX idx_category ON restaurants (categories);

CREATE TABLE stations
(
   sid              int PRIMARY KEY,
   station_name     varchar(120) not null,
   zip              varchar(8)   not null,
   city             varchar(50)  not null,
   state            varchar(5)   not null,
   street_address   varchar(150) not null,
   location         point        not null SRID 4326,
   access_code      varchar(7)   not null comment 'Could be public or private',
   access_days_time varchar(200) comment 'maybe support filtering 24 hours daily, there are around 2/3',
   SPATIAL INDEX (location)
);

CREATE TABLE electric_stations
(
   sid                int PRIMARY KEY,
   ev_dc_fast_num     int         not null comment 'in case of null, treat as 0 in preprocessing',
   ev_level1_evse_num int         not null,
   ev_level2_evse_num int         not null,
   ev_network         varchar(30) null comment 'There are 5 nulls',
   FOREIGN KEY (sid) REFERENCES Sstations (sid)
);

CREATE TABLE ports
(
   name varchar(10) PRIMARY KEY,
   type varchar(2) not null,
   CONSTRAINT port_validity CHECK (type in ('ac', 'dc'))
);

CREATE TABLE electric_vehicles
(
   id                  varchar(40) PRIMARY KEY,
   brand               varchar(20) not null,
   vehicle_type        varchar(15) not null, -- car, motorbike, etc.
   model               varchar(50) not null,
   release_year        int         null,
   variant             varchar(80) null,
   type                varchar(10) not null, -- e.g. bev
   usable_battery_size float(5, 2) not null,
   energy_consumption  float(4, 1) not null
);

CREATE TABLE station_ports
(
   sid  int,
   port varchar(10),
   PRIMARY KEY (sid, port),
   FOREIGN KEY (sid) REFERENCES electric_stations (sid),
   FOREIGN KEY (port) REFERENCES ports (name)
);

CREATE TABLE vehicle_ports
(
   vid  varchar(40),
   port varchar(10),
   PRIMARY KEY (vid, port),
   FOREIGN KEY (vid) REFERENCES electric_vehicles (id),
   FOREIGN KEY (port) REFERENCES ports (name)
);

CREATE TABLE adapters
(
   vehicle_port varchar(10),
   station_port varchar(10),
   type         varchar(2) not null,
   PRIMARY KEY (vehicle_port, station_port),
   FOREIGN KEY (vehicle_port) REFERENCES ports (name),
   FOREIGN KEY (station_port) REFERENCES ports (name),
   CONSTRAINT port_validity_1 CHECK (type in ('ac', 'dc'))
);
