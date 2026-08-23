import pytest

@pytest.mark.asyncio
async def test_get_daily_tasks(client):
    response = await client.get("/api/tasks/today")
    assert response.status_code == 200
    data = response.json()
    assert "tasks" in data
    assert len(data["tasks"]) > 0

@pytest.mark.asyncio
async def test_complete_task(client):
    response = await client.post("/api/tasks/dt-1/complete")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["task"]["status"] == "completed"

@pytest.mark.asyncio
async def test_reschedule_tasks(client):
    response = await client.post("/api/tasks/reschedule", json={"missedDaysCount": 3, "remainingWeeks": 6})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["tasks"]) > 0
