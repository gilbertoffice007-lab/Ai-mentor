import pytest

@pytest.mark.asyncio
async def test_get_profile(client):
    response = await client.get("/api/auth/profile")
    assert response.status_code == 200
    data = response.json()
    assert "email" in data
    assert data["fullName"] == "Gilbert Raj"

@pytest.mark.asyncio
async def test_update_profile(client):
    response = await client.put("/api/auth/profile", json={"fullName": "Gilbert Dev"})
    assert response.status_code == 200
    data = response.json()
    assert data["fullName"] == "Gilbert Dev"

@pytest.mark.asyncio
async def test_health_check(client):
    response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
