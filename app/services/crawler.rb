require 'selenium-webdriver'

class Crawler
  attr_reader :result, :session

  def initialize(url)
    ::Capybara.register_driver :chrome_headless do |app|
      options = ::Selenium::WebDriver::Chrome::Options.new

      options.add_argument('--headless')
      options.add_argument('--no-sandbox')
      options.add_argument('--disable-dev-shm-usage')
      options.add_argument('--window-size=1400,1400')
      options.add_argument('--remote-debugging-port=9111')

      client = Selenium::WebDriver::Remote::Http::Default.new
      client.read_timeout = 10_000

      ::Capybara::Selenium::Driver.new(app, browser: :chrome, options: options, http_client: client)
    end

    ::Capybara.run_server = false
    ::Capybara.default_max_wait_time = 10
    ::Capybara.javascript_driver = :chrome_headless

    session = ::Capybara::Session.new(:chrome_headless)
    session.visit url

    # session.within(:xpath, ".//form[@id='aform']") do
    #   session.fill_in 'userid', with: @store_code
    #   session.fill_in 'email', with: @account
    #   session.fill_in 'password', with: @password
    # end

    # session.find('#execute').click
    # session.within('#content') do
    #   @result = {
    #     title: title(session),
    #     cover: cover(session),
    #     authors: authors(session),
    #     artists: artists(session),
    #     genres: genres(session),
    #     status: status(session),
    #     description: description(session),
    #     volumes: volumes(session),
    #     chapters: chapters(session)
    #   }
    # end

    @session = session
  rescue StandardError => e
    Capybara.reset_sessions!
    @result = e.message
  end

  private

  def title(session)
    session.find('.card-header').text
  rescue StandardError
    nil
  end

  def cover(session)
    session.find('[title="See covers"] img')[:src]
  rescue StandardError
    nil
  end

  def authors(session)
    session.find_all('[href*=author]').map(&:text)
  rescue StandardError
    []
  end

  def artists(session)
    session.find_all('[href*=artist]').map(&:text)
  rescue StandardError
    []
  end

  def demographic(session)
    session.find_all('[href*=demo_id]').map(&:text)
  rescue StandardError
    []
  end

  def genres(session)
    session.find_all('[href*=genre]').map(&:text)
  rescue StandardError
    []
  end

  def status(session)
    session.find(:xpath, "//div[contains(text(), 'Pub. status:')]/following-sibling::div").text
  rescue StandardError
    nil
  end

  def description(session)
    session.find(:xpath, "//div[contains(text(), 'Description:')]/following-sibling::div").text
  rescue StandardError
    nil
  end

  def volumes(session)
    session.find('.reading_progress .list-inline-item:first-child').text.split('/').last
  rescue StandardError
    nil
  end

  def chapters(session)
    session.find('.reading_progress .list-inline-item:nth-child(2)').text.split('/').last
  rescue StandardError
    nil
  end
end
