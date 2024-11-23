INSTALLED_APPS += [
    'corsheaders',
]

MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')

CORS_ALLOW_ALL_ORIGINS = True  # Allows all origins, use specific origins in production