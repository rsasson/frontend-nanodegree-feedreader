/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have defined and non empty urls', function() {
      allFeeds.forEach(function(entry) {
        expect(entry.url).toBeDefined();
        expect(entry.url.length).not.toBe(0);
       });
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have defined and non empty names', function() {
      allFeeds.forEach(function(entry) {
        expect(entry.name).toBeDefined();
        expect(entry.name.length).not.toBe(0);
      });
    });
  });

  describe('The menu', function() {

    /* Test that ensures the menu element is
     * hidden by default.
     */
    it('is hidden by default', function() {
      var body = $('body');
      expect(body.hasClass('menu-hidden')).toBe(true);
    });

    /* Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * has two expectations: the menu displays when
     * clicked and hides when clicked again.
     */
    it('changes visibility when clicking menu icon', function() {
      var body = $('body'),
          menuIcon = $('.menu-icon-link');
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
  });

  /* Test that ensures when the loadFeed function is called
   * and completes its work, there is at least
   * a single .entry element within the .feed container.
   */
  describe('Initial Entries', function() {
    
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('should have more than one .entry element', function() {
      var entries = $('.entry');
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  /* Test that ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   */
  describe('New Feed Selection', function() {
    var initialTitle;
    var newTitle;

    // load different feeds in order and save titles
    beforeEach(function(done) {
      loadFeed(0, function() {
        initialTitle = $('.header-title').text();
        loadFeed(1, function() {
          newTitle = $('.header-title').text();
          done();
        });
      });
    });

    it('should have a different title', function() {
      expect(newTitle).not.toEqual(initialTitle);
    });

    // restore default feed
    afterEach(function(done) {
      loadFeed(0, done);
    });
  });

}());
