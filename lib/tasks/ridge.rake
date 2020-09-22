# frozen_string_literal: true

namespace :ridge do
  desc "Apply database schema allow drop table put ALLOW_DROP_TABLE or allow remove column put ALLOW_REMOVE_COLUMN"
  task apply: :environment do
    ENV["ALLOW_DROP_TABLE"] ||= "0"
    ENV["ALLOW_REMOVE_COLUMN"] ||= "0"
    task_return = ridgepole_output("--diff", "config/database.yml", "db/schemas/Schemafile")
    column_condition = task_return.include?("remove_column") && ENV["ALLOW_REMOVE_COLUMN"] == "0"
    table_condition = task_return.include?("drop_table") && ENV["ALLOW_DROP_TABLE"] == "0"
    if column_condition || table_condition
      puts '[Warning]this task contains some risks: "remove_column" or "drop_table"'
    else
      ridgepole("--apply", "--file #{schema_file}")
    end
    Rake::Task["db:schema:dump"].invoke
  end

  desc "Export database schema"
  task export: :environment do
    ridgepole("--export", "--split --output #{schema_file}")
  end

  private

  def schema_file
    Rails.root.join("db/schemas/Schemafile")
  end

  def config_file
    Rails.root.join("config/database.yml")
  end

  def ridgepole_output(*options)
    command = ["bundle exec ridgepole", "--config #{config_file}"]
    puts [command + env_option + options].join(" ")
    `#{[command + env_option + options].join(" ")}`
  end

  def ridgepole(*options)
    command = ["bundle exec ridgepole", "--config #{config_file}"]
    puts [command + env_option + options].join(" ")
    system [command + env_option + options].join(" ")
  end

  def env_option
    op = []
    op << "--env #{ENV['RAILS_ENV']}" if ENV["RAILS_ENV"].present?
    op
  end
end
