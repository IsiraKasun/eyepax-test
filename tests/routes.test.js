const request = require('supertest')
const app = require('../server')

describe('Employee CREATE API', () => {
    it('should create an employee', async () => {
        const res = await request(app)
            .post('/employee')
            .send({
                name: 'Testing Name',
                email: 'test@test.com',
                status: ''
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('sts')
    })
})