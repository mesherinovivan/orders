import json
from django.db.models import Q

class W2UIGridView(object):


    def get_records(self, req, qs):
        filters = Q()

        if not req.get("request"):
            return qs

        request = json.loads(req.get("request"))

        for search in request.get("search", []):
            if search["operator"] == "is":
                q = Q(**{'%s__exact' % search["field"]: search["value"]})
            elif search["operator"] == "between":
                q = Q(**{'%s__range' % search["field"]: search["value"]})
            elif search["operator"] == "less":
                q = Q(**{'%s__lt' % search["field"]: search["value"]})
            elif search["operator"] == "more":
                q = Q(**{'%s__gt' % search["field"]: search["value"]})
            elif search["operator"] == "in":
                q = Q(**{'%s__in' % search["field"]: search["value"]})
            elif search["operator"] == "not in":
                q = ~Q(**{'%s__in' % search["field"]: search["value"]})
            elif search["operator"] == "begins":
                q = Q(**{'%s__startswith' % search["field"]: search["value"]})
            elif search["operator"] == "contains":
                q = Q(**{'%s__contains' % search["field"]: search["value"]})
            elif search["operator"] == "null":
                q = Q(**{'%s__isnull' % search["field"]: True})
            elif search["operator"] == "not null":
                q = Q(**{'%s__isnull' % search["field"]: False})
            elif search["operator"] == "ends":
                q = Q(**{'%s__endswith' % search["field"]: search["value"]})
            else:
                raise Exception("Unsupported search operator '%s'" % search["operator"])

            if request["searchLogic"] == "OR":
                filters |= q
            else:
                filters &= q

        ordering = []
        for sort in request.get("sort", []):
            order = sort["field"]
            if sort["direction"] == "desc":
                order = "-" + order
            ordering.append(order)

        #limits = (request["offset"], request["offset"] + request["limit"])

        records = qs.filter(filters)
        records = records.order_by(*ordering)

        return records