from django.urls import path
from .views import *

urlpatterns = [
    path("login/", student_login, name="staff_login"),
    path("signup/", student_signup, name="staff_signup"),
    # path("profile/", staff_profile, name="staff_profile"),
    # path("get_students/", get_students, name="get_students"),

]
