from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

def send_mail(name, group_name, poll_name, poll_id, mail_to_send):
  template = render_to_string('email_template.html', 
  {'name': name,
  'group_name': group_name,
  'poll_name': poll_name,
  'poll_id': poll_id,
  })

  email = EmailMessage(
    'Nowa ankieta do wypełnienia!',
    template,
    settings.EMAIL_HOST_USER,
    [mail_to_send],
  )

  email.fail_silently=False,
  email.send()