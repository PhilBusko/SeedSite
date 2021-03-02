"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
DATABASE MODELS
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.db import models
import app_proj.common.database_helper as DH


"""
class Product(models.Model):
    ParentFK = models.ForeignKey(Parent, on_delete=models.DO_NOTHING)
    Name = models.CharField(max_length=100)
    Name = models.TextField()
    IsActive = models.BooleanField()

    objects = DH.BaseManager()
    class Meta:
        unique_together = ('Bucket', 'Name')
"""

