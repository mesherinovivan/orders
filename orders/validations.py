import six

from filters.schema import base_query_params_schema
from filters.validations import (
    CSVofIntegers,
    IntegerLike,
    DatetimeWithTZ,
)

# make a validation schema for players filter query params
players_query_schema = base_query_params_schema.extend(
    {
        "id": IntegerLike(),
        "number": IntegerLike(),  # Depends on python version
        "order_date": DatetimeWithTZ(),  # /?team_id=1,2,3
        "price": DatetimeWithTZ(),
        "text": six.text_type,
        "account_id": IntegerLike(),

    }
)