'use strict'

const controller = require('../controller');


server.get('/zones/:zone_identifier/dns_records', controller.local.list_dns_records);

server.post('/zones/:zone_identifier', controller.local.create_dns_record);