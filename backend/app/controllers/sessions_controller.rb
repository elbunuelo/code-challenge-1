class SessionsController < ApplicationController
  # If you're using a strategy that POSTs during callback, you'll need to skip the authenticity token check for the callback action only.
  skip_before_action :verify_authenticity_token, only: [:create, :delete]

  def create
    session[:github] = auth_hash
  end

  def delete
    session[:github] = nil
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
