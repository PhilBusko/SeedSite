"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
DATABASE HELPER
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
from django.db import models
from django.core.exceptions import ObjectDoesNotExist


class BaseManager(models.Manager):

    def getOrNone(self, **kwargs):
        try:
            return self.get(**kwargs)
        except ObjectDoesNotExist:
            return None



"""
def GetTableCounts():
    table_ls = [ table for table, clss in TB.__dict__.items() if isinstance(clss, type) ]
    count_ls = []

    for tbl in table_ls:
        command = f'TB.{tbl}.objects.count()'
        count = eval(command)
        new_dx ={
            'Table': tbl,
            'Count': count,
        }
        count_ls.append(new_dx)

    return count_ls

def InsertDictToTable(data_ls, table):
    # data_obj_ls = [MovieDB_Load(**r) for r in data_ls]
    # MovieDB_Load.objects.bulk_create(data_obj_ls)
    data_obj_ls = eval(f"[TB.{table}(**r) for r in data_ls]")
    exec(f"TB.{table}.objects.bulk_create(data_obj_ls, ignore_conflicts=True)")
"""
