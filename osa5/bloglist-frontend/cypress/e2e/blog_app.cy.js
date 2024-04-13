describe('Blog ', function () {
  beforeEach(async function () {
    cy.visit('/')
    cy.request('POST', '/api/testing/reset')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('login form shown', function () {
    cy.get('input[placeholder*="username"]')
    cy.get('input[placeholder*="password"]')
    cy.get('button').contains('login')
  })
})
