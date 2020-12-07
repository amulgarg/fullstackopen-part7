describe('blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username:'testuser',
      name: 'test',
      password: 'password'
    });
    cy.visit('http://localhost:3001');
    //window.localStorage.removeItem('user');//logout the user
  });

  it('shows a login form', () => {
    console.log('hello');
    cy.contains('Login to the application');
    cy.get('#login-form');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('testuser');
      cy.get('#password').type('password');
      cy.get('#login-submit').click();
    });

    it('fails with incorrect credentials', () => {
      cy.contains('logout').click();
      cy.get('#username').type('testuser');
      cy.get('#password').type('wrong password');
      cy.get('#login-submit').click();
      cy.get('.error-message')
        .contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      //cy.contains('logout').click();

      cy.get('#username').type('testuser');
      cy.get('#password').type('password');
      cy.get('#login-submit').click();
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click();
      cy.get('#title').type('test blog title');
      cy.get('#author').type('test blog author');
      cy.get('#url').type('test_blog_url');
      cy.get('#submit-blog-form').click();
      cy.contains('A new blog test blog title by test blog author added!')
    })

    const createABlog = () => {
      cy.contains('Create new blog').click();
      cy.get('#title').type('test blog title');
      cy.get('#author').type('test blog author');
      cy.get('#url').type('test_blog_url');
      cy.get('#submit-blog-form').click();
      cy.contains('A new blog test blog title by test blog author added!');
    }

    it('A blog can be liked', function() {
      createABlog();
      cy.get('#test_blog_url').get('.view').click();
      cy.get('#test_blog_url').get('.like').click();
    })

    it('user can delete a blog he created', function() {
      createABlog();

      cy.get('#test_blog_url').get('.view').click();
      cy.get('#test_blog_url').get('.remove').click();
    })

    it.only('blogs are sorted by number of likes', async function() {

      cy.request('POST', 'http://localhost:3003/api/login', {
        username:'testuser',
        password: 'password'
      }).then((user) => {
        console.log('user', user);
        //inserting some blogs to do a real check
        cy.request('POST', `http://localhost:3003/api/testing/seed-blogs?username=${user.body.username}`).then((response) => {
          const sortedBlogs =  response.body.blogs.sort((a, b) => b.likes - a.likes);
          const sortedBlogsIds = sortedBlogs.map(blog => blog.id);
          cy.reload(true);//hack to refresh the page and update the blogs list
          const arrayOfIdsFromElements = [];
          cy.get('.blog', { timeout: 10000 }).should('be.visible').each(blogElement => arrayOfIdsFromElements.push(blogElement.attr('data-blogid'))).then(() => {
            expect(JSON.stringify(sortedBlogsIds)).to.eq(JSON.stringify(arrayOfIdsFromElements));
          });
        })
      })

      //const blogs = await cy.request('GET', `http://localhost:3003/api/blogs?userId=${user.username}`);

      //console.log('blogs cy', blogs);

    });


  })

})