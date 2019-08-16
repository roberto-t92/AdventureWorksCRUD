//Department Form Model
function DepartmentModel() {
    let DepartmentID = "", Name = "", GroupName = "", OperationType = "";
}

// Department GET
$(document).ready(function () {
    $("#departmentTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            departmentReset();
        },
        "ajax": {
            "url": "/HumanResources/GetDepartment",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "DepartmentID" },
            { "data": "Name" },
            { "data": "GroupName" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data" : "DepartmentID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowDepartment(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=departmentConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//Department Edit Button
function editRowDepartment(data) {
    $('#departmentSave').text('Update');

    $('#departmentTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#departmentName').removeClass('border border-danger');
        $('#departmentGroupName').removeClass('border border-danger');
    });

    $('#departmentTable tbody').on('click', 'button', function () {
        let table = $('#departmentTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#departmentName').val(row.Name);
        $('#departmentGroupName').val(row.GroupName);
        $('#departmentID').val(data);
    });
}

//Department Validate
function validateDepartment() {
    let val = true;

    if ($("#departmentName").val() == "" || $("#departmentGroupName").val() == "") {
        $("#departmentAlert").show('fade');
        setTimeout(function () { $("#departmentAlert").hide('fade'); }, 7000);
        val = false;
    }
    if ($("#departmentGroupName").val() == "") {
        $("#departmentGroupName").addClass('border border-danger');        
        val = false;
    }
    if ($('#departmentName').val() == "") {
        $("#departmentName").addClass('border border-danger');        
        val = false;
    }
    return val;
}

//Department Save
$('#departmentSave').click(function () {
    if (validateDepartment()) {
        departmentPOST();
    }
});

//Department POST
function departmentPOST() {

    let LDepartmentModel = new DepartmentModel();
    LDepartmentModel.DepartmentID = $('#departmentID').val();
    LDepartmentModel.Name = $('#departmentName').val();
    LDepartmentModel.GroupName = $('#departmentGroupName').val();
    LDepartmentModel.OperationType = $('#departmentSave').text();

    let ljson = JSON.stringify({ DM: LDepartmentModel });

    $.ajax({
        url: '/HumanResources/PostDepartment',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                departmentReset();
            }
        },
        success: function () {
            $.unblockUI();
            departmentPostSuccess();
            $('#departmentTable').DataTable().ajax.reload();
            departmentReset();
        }
    });
}

//Department POST - Success
function departmentPostSuccess() {
    $('#departmentPostSuccess').show('fade');
    setTimeout(function () { $('#departmentPostSuccess').hide('fade'); }, 6000);
}

//Department DELETE
function departmentConfirm(data) {
    $('#departmentModal').modal('show');
    $('#departmentDeleteID').val(data);
}
function departmentDelete() {
    let id = $('#departmentDeleteID').val();
    $('#departmentID').val(id)
    $('#departmentSave').text('Delete');
    departmentPOST();
}

//Department Form - Remove red border as user type
$("#departmentGroupName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#departmentName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Department Reset
$("#departmentReset").click(function () {
    departmentReset();
});
function departmentReset() {
    $('#departmentName').val('');
    $('#departmentGroupName').val('');
    $('#departmentName').removeClass('border border-danger');
    $('#departmentGroupName').removeClass('border border-danger');
    $('#departmentTable tr').removeClass('text-primary');
    $('#departmentID').val('');

    $('#departmentDeleteID').val('');
    $('#departmentSave').text('Save');
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

//Employee Form Model
function EmployeeModel() {
    let BusinessEntityID = "", NationalIDNumber = "", LoginID = "", OrganizationLevel = "", JobTitle = "", BirthDate = "",
        MaritalStatus = "", Gender = "", HireDate = "", SalariedFlag = "", VacationHours = "", SickLeaveHours = "", CurrentFlag = "",
        rowguid = "", OperationType = "";
}

//Employee GET
$(document).ready(function () {
    $("#employeeTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            employeeReset();
        },        
        "ajax": {
            "url": "/HumanResources/GetEmployee",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "BusinessEntityID" },
            { "data": "NationalIDNumber" },
            { "data": "LoginID" },
            //{ "data": "OrganizationNode" },
            //{ "data": "OrganizationLevel" },
            { "data": "JobTitle" },
            {
                "data": "BirthDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            { "data": "MaritalStatus" },
            { "data": "Gender" },
            {
                "data": "HireDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            { "data": "SalariedFlag" },
            { "data": "VacationHours" },
            { "data": "SickLeaveHours" },
            { "data": "CurrentFlag" },
            { "data": "rowguid" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "BusinessEntityID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowEmployee(" + data + ")><i class='fas fa-edit'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//Employee Edit Button
function editRowEmployee(data) {
    $('#employeeSave').text('Update');

    $('#employeeTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');

        $('#employeeNationalIDNumber').removeClass('border border-danger');
        $('#employeeLoginID').removeClass('border border-danger');
        //$('#employeeOrganizationLevel').removeClass('border border-danger');
        $('#employeeJobTitle').removeClass('border border-danger');
        $('#employeeBirthDate').removeClass('border border-danger');
        $('#employeeMaritalStatus').removeClass('border border-danger');
        $('#employeeGender').removeClass('border border-danger');
        $('#employeeHireDate').removeClass('border border-danger');
        $('#employeeSalariedFlag').removeClass('border border-danger');
        $('#employeeVacationHours').removeClass('border border-danger');
        $('#employeeSickLeaveHours').removeClass('border border-danger');
        $('#employeeCurrentFlag').removeClass('border border-danger');
        $('#employeeRowguid').removeClass('border border-danger');
    });

    $('#employeeTable tbody').on('click', 'button', function () {
        let table = $('#employeeTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#employeeNationalIDNumber').val(row.NationalIDNumber);
        $('#employeeLoginID').val(row.LoginID);
        //$('#employeeOrganizationLevel').val(row.OrganizationLevel);
        $('#employeeJobTitle').val(row.JobTitle);        
        $('#employeeBirthDate').val(moment(row.BirthDate).format("DD-MM-YYYY"));
        $('#employeeMaritalStatus').val(row.MaritalStatus);
        $('#employeeGender').val(row.Gender);
        $('#employeeHireDate').val(moment(row.HireDate).format("DD-MM-YYYY"));
        $('#employeeSalariedFlag').val(row.SalariedFlag);
        $('#employeeVacationHours').val(row.VacationHours);
        $('#employeeSickLeaveHours').val(row.SickLeaveHours);
        $('#employeeCurrentFlag').val(row.CurrentFlag);
        $('#employeeRowguid').val(row.rowguid);

        $('#employeeID').val(data);
    });
}

//Employee Validate
function validateEmployee() {
    let val = true;

    if ($("#employeeNationalIDNumber").val() == "") {
        $("#employeeNationalIDNumber").addClass('border border-danger');
        val = false;
    }
    if ($('#employeeLoginID').val() == "") {
        $("#employeeLoginID").addClass('border border-danger');        
        val = false;
    }
    if ($('#employeeJobTitle').val() == "") {
        $("#employeeJobTitle").addClass('border border-danger');
        val = false;
    }
    if ($('#employeeBirthDate').val() == "") {
        $("#employeeBirthDate").addClass('border border-danger');
        val = false;
    }
    if ($('#employeeMaritalStatus').val() == "") {
        $('#employeeMaritalStatus').addClass('border border-danger');
        val = false;
    }
    if ($('#employeeGender').val() == "") {
        $('#employeeGender').addClass('border border-danger');
        val = false;
    }
    if ($('#employeeHireDate').val() == "") {
        $('#employeeHireDate').addClass('border border-danger');
        val = false;
    }
    if ($('#employeeSalariedFlag').val() == "") {
        $('#employeeSalariedFlag').addClass('border border-danger');
        val = false;
    }
    if ($('#employeeVacationHours').val() == "") {
        $('#employeeVacationHours').addClass('border border-danger');
        val = false;
    }
    if ($('#employeeSickLeaveHours').val() == "") {
        $('#employeeSickLeaveHours').addClass('border border-danger');
        val = false;
    }
    if ($('#employeeCurrentFlag').val() == "") {
        $('#employeeCurrentFlag').addClass('border border-danger');
        val = false;
    }
    if ($('#employeeRowguid').val() == "") {
        $('#employeeRowguid').addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#employeeAlert").show('fade');
        setTimeout(function () { $("#employeeAlert").hide('fade'); }, 7000);
    }

    return val;
}

//Employee Save
$('#employeeSave').click(function () {
    if (validateEmployee()) {
        employeePOST();
    }
});

//Employee POST
function employeePOST() {

    let viewModel = new EmployeeModel();
    viewModel.BusinessEntityID = $('#employeeID').val();
    viewModel.NationalIDNumber = $('#employeeNationalIDNumber').val();
    viewModel.LoginID = $('#employeeLoginID').val();
    //viewModel.OrganizationLevel = $('#employeeOrganizationLevel').val();
    viewModel.JobTitle = $('#employeeJobTitle').val();
    viewModel.BirthDate = $('#employeeBirthDate').val();
    viewModel.MaritalStatus = $('#employeeMaritalStatus').val();
    viewModel.Gender = $('#employeeGender').val();
    viewModel.HireDate = $('#employeeHireDate').val();
    viewModel.SalariedFlag = $('#employeeSalariedFlag').val();
    viewModel.VacationHours = $('#employeeVacationHours').val();
    viewModel.SickLeaveHours = $('#employeeSickLeaveHours').val();
    viewModel.CurrentFlag = $('#employeeCurrentFlag').val();
    viewModel.rowguid = $('#employeeRowguid').val();

    viewModel.OperationType = $('#employeeSave').text();

    let ljson = JSON.stringify({ EM: viewModel });

    $.ajax({
        url: '/HumanResources/PostEmployee',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                employeeReset();
            }
        },
        success: function () {
            $.unblockUI();
            employeePostSuccess();
            $('#employeeTable').DataTable().ajax.reload();
            employeeReset();
        }
    });
}

//Employee POST Success
function employeePostSuccess() {
    $('#employeePostSuccess').show('fade');
    setTimeout(function () { $('#employeePostSuccess').hide('fade'); }, 6000);
}

//Employee DELETE
function employeeConfirm(data) {
    $('#employeeModal').modal('show');
    $('#employeeDeleteID').val(data);
}
function employeeDelete() {
    let id = $('#employeeDeleteID').val();
    $('#employeeID').val(id)
    $('#employeeSave').text('Delete');
    employeePOST();
}

//Employee Form - Remove red border as user type
$("#employeeNationalIDNumber").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeLoginID").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
//OrganizationLevel
$("#employeeJobTitle").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeBirthDate").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeMaritalStatus").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeGender").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeHireDate").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeSalariedFlag").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeVacationHours").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeSickLeaveHours").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeCurrentFlag").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeeRowguid").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Employee Reset
$("#employeeReset").click(function () {
    employeeReset();
});
function employeeReset() {
    $('#employeeNationalIDNumber').val('');
    $('#employeeLoginID').val('');
    //$('#employeeOrganizationLevel').val('');
    $('#employeeJobTitle').val('');
    $('#employeeBirthDate').val('');
    $('#employeeMaritalStatus').val('');
    $('#employeeGender').val('');
    $('#employeeHireDate').val('');
    $('#employeeSalariedFlag').val('');
    $('#employeeVacationHours').val('');
    $('#employeeSickLeaveHours').val('');
    $('#employeeCurrentFlag').val('');
    $('#employeeRowguid').val('');
    $('#employeeNationalIDNumber').removeClass('border border-danger');
    $('#employeeLoginID').removeClass('border border-danger');
    //$('#employeeOrganizationLevel').removeClass('border border-danger');
    $('#employeeJobTitle').removeClass('border border-danger');
    $('#employeeBirthDate').removeClass('border border-danger');
    $('#employeeMaritalStatus').removeClass('border border-danger');
    $('#employeeGender').removeClass('border border-danger');
    $('#employeeHireDate').removeClass('border border-danger');
    $('#employeeSalariedFlag').removeClass('border border-danger');
    $('#employeeVacationHours').removeClass('border border-danger');
    $('#employeeSickLeaveHours').removeClass('border border-danger');
    $('#employeeCurrentFlag').removeClass('border border-danger');
    $('#employeeRowguid').removeClass('border border-danger');
    $('#employeeTable tr').removeClass('text-primary');

    $('#employeeID').val('');
    $('#employeeSave').text('Save');
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

//EmployeePayHistory Form Model
function EmployeePayHisModel() {
    let BusinessEntityID = "", RateChangeDate = "", Rate = "", PayFrequency = "", OperationType = "";
}

//EmployeePayHistory GET
$(document).ready(function () {
    $("#employeePayHisTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            employeePayHisReset();
        },
        "ajax": {
            "url": "/HumanResources/GetEmployeePayHis",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "BusinessEntityID" },
            {
                "data": "RateChangeDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            { "data": "Rate" },
            { "data": "PayFrequency" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "BusinessEntityID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowEmployeePayHis(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=employeePayHisConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//EmployeePayHistory Edit Button
function editRowEmployeePayHis(data) {
    $('#employeePayHisSave').text('Update');

    $('#employeePayHisTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');

        $('#employeePayHisRateChangeDate').removeClass('border border-danger');
        $('#employeePayHisRate').removeClass('border border-danger');
        $('#employeePayHisPayFrequency').removeClass('border border-danger');
    });

    $('#employeePayHisTable tbody').on('click', 'button', function () {
        let table = $('#employeePayHisTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        if (row.RateChangeDate === null) {
            $('#employeePayHisRateChangeDate').val('');
        }
        else {
            $('#employeePayHisRateChangeDate').val(moment(row.RateChangeDate).format("DD-MM-YYYY"));
        }
        $('#employeePayHisRate').val(row.Rate);
        $('#employeePayHisPayFrequency').val(row.PayFrequency);

        $('#employeePayHisID').val(data);
    });
}

//EmployeePayHistory Validate
function validateEmployeePayHis() {
    let val = true;

    if ($("#employeePayHisRateChangeDate").val() == "") {
        $("#employeePayHisRateChangeDate").addClass('border border-danger');
        val = false;
    }
    if ($('#employeePayHisRate').val() == "") {
        $("#employeePayHisRate").addClass('border border-danger');
        val = false;
    }
    if ($('#employeePayHisPayFrequency').val() == "") {
        $("#employeePayHisPayFrequency").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#employeePayHisAlert").show('fade');
        setTimeout(function () { $("#employeePayHisAlert").hide('fade'); }, 7000);
    }

    return val;
}

//EmployeePayHistory Save
$('#employeePayHisSave').click(function () {
    if (validateEmployeePayHis()) {
        employeePayHisPOST();
    }
});

//EmployeePayHistory POST
function employeePayHisPOST() {

    let viewModel = new EmployeePayHisModel();
    viewModel.BusinessEntityID = $('#employeePayHisID').val();
    viewModel.RateChangeDate = $('#employeePayHisRateChangeDate').val();
    viewModel.Rate = $('#employeePayHisRate').val();
    viewModel.PayFrequency = $('#employeePayHisPayFrequency').val();

    viewModel.OperationType = $('#employeePayHisSave').text();

    let ljson = JSON.stringify({ EPH: viewModel });

    $.ajax({
        url: '/HumanResources/PostEmployeePayHis',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                employeePayHisReset();
            }
        },
        success: function () {
            $.unblockUI();
            employeePayHisPostSuccess();
            $('#employeePayHisTable').DataTable().ajax.reload();
            employeePayHisReset();
        }
    });
}

//EmployeePayHistory POST Success
function employeePayHisPostSuccess() {
    $('#employeePayHisPostSuccess').show('fade');
    setTimeout(function () { $('#employeePayHisPostSuccess').hide('fade'); }, 6000);
}

//EmployeePayHistory DELETE
function employeePayHisConfirm(data) {
    $('#employeePayHisModal').modal('show');
    $('#employeePayHisDeleteID').val(data);
}
function employeePayHisDelete() {
    let id = $('#employeePayHisDeleteID').val();
    $('#employeePayHisID').val(id)
    $('#employeePayHisSave').text('Delete');
    employeePayHisPOST();
}

//EmployeePayHistory Form - Remove red border as user type
$("#employeePayHisRateChangeDate").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeePayHisRate").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#employeePayHisPayFrequency").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//EmployeePayHistory Reset
$("#employeePayHisReset").click(function () {
    employeePayHisReset();
});
function employeePayHisReset() {
    $('#employeePayHisRateChangeDate').val('');
    $('#employeePayHisRate').val('');
    $('#employeePayHisPayFrequency').val('');
    $('#employeePayHisRateChangeDate').removeClass('border border-danger');
    $('#employeePayHisRate').removeClass('border border-danger');
    $('#employeePayHisPayFrequency').removeClass('border border-danger');

    $('#employeePayHisID').val('');
    $('#employeePayHisSave').text('Save');
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

//Shift Form Model
function ShiftModel() {
    let ShiftID = "", Name = "", StartTime = "", EndTime = "", OperationType = "";
}

//Shift GET
$(document).ready(function () {
    $("#shiftTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            shiftReset();
        },
        "ajax": {
            "url": "/HumanResources/GetShift",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "ShiftID" },
            { "data": "Name" },
            {
                "data": "StartTime",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('hh:mm:ss');
                }
            },
            {
                "data": "EndTime",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('hh:mm:ss');
                }
            },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "ShiftID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowShift(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=shiftConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//Shift Edit Button
function editRowShift(data) {
    $('#shiftSave').text('Update');

    $('#shiftTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');

        $('#shiftName').removeClass('border border-danger');
        $('#shiftStartTime').removeClass('border border-danger');
        $('#shiftEndTime').removeClass('border border-danger');
    });

    $('#shiftTable tbody').on('click', 'button', function () {
        let table = $('#shiftTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#shiftName').val(row.Name);

        if (row.StartTime === null) {
            $('#shiftStartTime').val('');
        }
        else {
            $('#shiftStartTime').val(moment(row.StartTime).format("hh:mm:ss"));
        }

        if (row.EndTime === null) {
            $('#shiftEndTime').val('');
        }
        else {
            $('#shiftEndTime').val(moment(row.EndTime).format("hh:mm:ss"));
        }

        $('#shiftID').val(data);
    });
}

//Shift Validate
function validateShift() {
    let val = true;

    if ($("#shiftName").val() == "") {
        $("#shiftName").addClass('border border-danger');
        val = false;
    }
    if ($('#shiftStartTime').val() == "") {
        $("#shiftStartTime").addClass('border border-danger');
        val = false;
    }
    if ($('#shiftEndTime').val() == "") {
        $("#shiftEndTime").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#shiftAlert").show('fade');
        setTimeout(function () { $("#shiftAlert").hide('fade'); }, 7000);
    }

    return val;
}

//Shift Save
$('#shiftSave').click(function () {
    if (validateShift()) {
        shiftPOST();
    }
});

//Shift POST
function shiftPOST() {

    let viewModel = new ShiftModel();
    viewModel.ShiftID = $('#shiftID').val();
    viewModel.Name = $('#shiftName').val();
    viewModel.StartTime = $('#shiftStartTime').val();
    viewModel.EndTime = $('#shiftEndTime').val();

    viewModel.OperationType = $('#shiftSave').text();

    let ljson = JSON.stringify({ SH : viewModel });

    $.ajax({
        url: '/HumanResources/PostShift',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                shiftReset();
            }
        },
        success: function () {
            $.unblockUI();
            shiftPostSuccess();
            $('#shiftTable').DataTable().ajax.reload();
            shiftReset();
        }
    });
}

//Shift POST Success
function shiftPostSuccess() {
    $('#shiftPostSuccess').show('fade');
    setTimeout(function () { $('#shiftPostSuccess').hide('fade'); }, 6000);
}

//Shift DELETE
function shiftConfirm(data) {
    $('#shiftModal').modal('show');
    $('#shiftDeleteID').val(data);
}
function shiftDelete() {
    let id = $('#shiftDeleteID').val();
    $('#shiftID').val(id)
    $('#shiftSave').text('Delete');
    shiftPOST();
}

//Shift Form - Remove red border as user type
$("#shiftName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#shiftStartTime").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#shiftEndTime").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Shift Reset
$("#shiftReset").click(function () {
    shiftReset();
});
function shiftReset() {
    $('#shiftName').val('');
    $('#shiftStartTime').val('');
    $('#shiftEndTime').val('');
    $('#shiftName').removeClass('border border-danger');
    $('#shiftStartTime').removeClass('border border-danger');
    $('#shiftEndTime').removeClass('border border-danger');

    $('#shiftID').val('');
    $('#shiftSave').text('Save');
}

