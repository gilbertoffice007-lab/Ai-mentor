import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.api.deps import data_store

@pytest.fixture(autouse=True)
def reset_store():
    data_store.reset_to_defaults()
    yield

@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as c:
        yield c
