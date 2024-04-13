describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', '/api/testing/reset')
    cy.visit('/')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('login form shown', function () {
    cy.get('input[placeholder="username"]')
    cy.get('input[placeholder="password"]')
    cy.get('button').contains('login')
  })

  describe('Login', function () {

    beforeEach(function () {

      // register cypress:cypress
      cy.request('POST', '/api/users', {
        username: 'cypress',
        password: 'cypress',
        name: 'Cypress'
      })
      // localStorage.setItem('user', JSON.stringify(body))
      cy.visit('/')
    })

    it('works with correct user:pass', function () {
      cy.get('input[placeholder="username"]').type('cypress')
      cy.get('input[placeholder="password"]').type('cypress')
      cy.get('button').contains('login').click()

      cy.contains('Cypress logged in')
      cy.get('.feedback')
        .contains('login succeeded')
    })

    it('fails with incorrect username', function () {
      cy.get('input[placeholder="username"]').type('asdf')
      cy.get('input[placeholder="password"]').type('cypress')
      cy.get('button').contains('login').click()

      cy.get('.feedback.error')
        .contains('login failed: user not found')
    })

    it('fails with incorrect password', function () {
      cy.get('input[placeholder="username"]').type('cypress')
      cy.get('input[placeholder="password"]').type('asdf')
      cy.get('button').contains('login').click()

      cy.get('.feedback.error')
        .contains('login failed: wrong password')
    })

    describe('when logged in', function () {

      beforeEach(function () {
        cy.login({
          username: 'cypress',
          password: 'cypress'
        })
      })

      it('user can create blog', function () {
        cy.contains('create new blog').click()
        cy.get('input').then(([title, author, url]) => {
          cy.wrap(title).type('cypress title')
          cy.wrap(author).type('cypress author')
          cy.wrap(url).type('cypress url')
        })
        cy.get('button').contains('create').click()


        cy.get('.feedback')
          .contains('creating new blog succeeded')

        cy.get('li').contains('cypress title')
      })
    })

  })

})
