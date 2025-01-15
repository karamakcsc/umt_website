import frappe
from datetime import datetime, timedelta


@frappe.whitelist()
def get_car_models():
    items = frappe.get_all(
        "Item",
        fields=["name", "item_name", "image"],
        filters={"disabled": 0},
        order_by="name asc"
    )
    return items


@frappe.whitelist()
def set_appointment(data):
    try:
        data = frappe.parse_json(data)

        # Check if lead already exists
        lead_exists = frappe.db.exists("Lead", {
            "first_name": data.get("fname"),
            "last_name": data.get("lname"),
            "email": data.get("email")
        })

        if not lead_exists:
            # Create the lead if it doesn't exist
            lead = frappe.get_doc({
                "doctype": "Lead",
                "first_name": data.get("fname"),
                "last_name": data.get("lname"),
                "email": data.get("email"),
                "mobile_no": data.get("phone"),
                "website": data.get("website"),
                "status": "Lead"
            })
            lead.insert(ignore_permissions=True)
            frappe.db.commit()
            lead_name = lead.name
        else:
            lead_name = lead_exists

        # Combine preferred_date and preferred_time for starts_on
        preferred_date = data.get("preferred_date") 
        preferred_time = data.get("preferred_time") 
        starts_on = datetime.strptime(f"{preferred_date} {preferred_time}", "%Y-%m-%d %H:%M:%S")

        # Set ends_on to 30 minutes after starts_on
        ends_on = starts_on + timedelta(minutes=30)

        # Create an event for the lead
        task = frappe.get_doc({
            "doctype": "Event",
            "subject": f"Request an Appointment for {data.get('fname')} {data.get('lname')}",
            "status": "Open",
            "event_type": "Private",
            "event_category": "Event",
            "starts_on": starts_on,
            "ends_on": ends_on,
            "description": data.get("message"),
            "event_participants": [{
                "reference_doctype": "Lead",
                "reference_docname": lead_name
            }]
        })
        task.insert(ignore_permissions=True)
        frappe.db.commit()

        return {"success": True, "message": "Appointment created successfully!"}

    except Exception as e:
        frappe.log_error(f"Appointment Creation Error: {str(e)}", "Appointment Creation")
        return {"success": False, "message": str(e)}


@frappe.whitelist()
def inquiry_form(data):
    try:
        data = frappe.parse_json(data)

        # Check if lead already exists
        lead_exists = frappe.db.exists("Lead", {
            "first_name": data.get("fname"),
            "last_name": data.get("lname"),
            "email_id": data.get("email")
        })

        if not lead_exists:
            # Create the lead if it doesn't exist
            lead = frappe.get_doc({
                "doctype": "Lead",
                "first_name": data.get("fname"),
                "last_name": data.get("lname"),
                "email_id": data.get("email"),
                "mobile_no": data.get("phone"),
                "website": data.get("website"),
                "status": "Lead"
            })
            lead.insert(ignore_permissions=True)
            frappe.db.commit()
            lead_name = lead.name
        else:
            lead_name = lead_exists

        # Create a task for the lead
        task = frappe.get_doc({
            "doctype": "Task",
            "subject": f"Follow up with {data.get('fname')} {data.get('lname')}",
            "status": "Open",
            "type": "Inquiry",
            "description": data.get("message"),
            "exp_start_date": datetime.now()
        })
        task.insert(ignore_permissions=True)
        frappe.db.commit()

        return {"success": True, "message": "Task created successfully!"}

    except Exception as e:
        frappe.log_error(f"Lead/Task Creation Error: {str(e)}", "Lead/Task Creation")
        return {"success": False, "message": str(e)}
    

@frappe.whitelist()
def test_drive(data):
    try:
        data = frappe.parse_json(data)

        # Check if lead already exists
        lead_exists = frappe.db.exists("Lead", {
            "first_name": data.get("fname"),
            "last_name": data.get("lname"),
            "email_id": data.get("email")
        })

        if not lead_exists:
            # Create the lead if it doesn't exist
            lead = frappe.get_doc({
                "doctype": "Lead",
                "first_name": data.get("fname"),
                "last_name": data.get("lname"),
                "email_id": data.get("email"),
                "mobile_no": data.get("phone"),
                "website": data.get("website"),
                "status": "Lead"
            })
            lead.insert(ignore_permissions=True)
            frappe.db.commit()
            lead_name = lead.name
        else:
            lead_name = lead_exists

        # Combine preferred_date and preferred_time for starts_on
        preferred_date = data.get("preferred_date") 
        preferred_time = data.get("preferred_time") 
        starts_on = datetime.strptime(f"{preferred_date} {preferred_time}", "%Y-%m-%d %H:%M:%S")

        # Set ends_on to 30 minutes after starts_on
        ends_on = starts_on + timedelta(minutes=30)

        # Create an event for the lead
        event = frappe.get_doc({
            "doctype": "Event",
            "subject": f"Request for Test Drive for {data.get('fname')} {data.get('lname')} on {data.get('model')}",
            "status": "Open",
            "event_type": "Private",
            "event_category": "Event",
            "starts_on": starts_on,
            "ends_on": ends_on,
            "description": data.get("message"),
            "event_participants": [{
                "reference_doctype": "Lead",
                "reference_docname": lead_name
            }]
        })
        event.insert(ignore_permissions=True)
        frappe.db.commit()

        return {"success": True, "message": "Event created successfully!"}

    except Exception as e:
        frappe.log_error(f"Event Creation Error: {str(e)}", "Event Creation")
        return {"success": False, "message": str(e)}