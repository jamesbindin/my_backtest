from sqlmodel import SQLModel, Field
from datetime import datetime

class Instrument(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    symbol: str
    timeframe: str


class PriceData(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    time: datetime = Field(index=True)
    instrument_id: int = Field(foreign_key="instrument.id")
    open: float
    high: float
    low: float
    close: float
    volume: int

