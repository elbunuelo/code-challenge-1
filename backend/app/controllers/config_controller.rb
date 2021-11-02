class ConfigController < ApplicationController
  def index
    config_hash = {
      isLoggedIn: false,
      user: nil,
      links: {
        auth: "#{request.env['rack.url_scheme']}://#{request.host_with_port}/auth/github"
      }
    }

    if session[:github]
      config_hash[:user] = session[:github]
      config_hash[:isLoggedIn] = true;
    end

    render json: config_hash
  end
end
