Rails.application.config.session_options = {
  :key =>           '_session_id',
  :path =>          '/',
  :domain =>        'http://localhost:3001',
  :expire_after =>  nil,
  :secure =>        false,
  :httponly =>      true,
  :cookie_only =>   true
}
