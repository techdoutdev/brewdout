***REMOVED***
WSGI config for brewdout project.

It exposes the WSGI callable as a module-level variable named ``application``.

***REMOVED***
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
***REMOVED***

***REMOVED***

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'brewdout.settings')

application = get_wsgi_application()
