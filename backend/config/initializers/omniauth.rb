Rails.application.config.middleware.use OmniAuth::Builder do
    provider :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET'], scope: 'gist', provider_ignores_state: true
    OmniAuth.config.allowed_request_methods = [:get, :post]
end
