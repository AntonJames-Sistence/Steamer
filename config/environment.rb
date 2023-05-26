# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

# letting know my jbuilder in what format send data
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true