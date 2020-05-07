package com.tvm.taskflowAngular.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.tvm.taskflowAngular.Service.ClientService;
import com.tvm.taskflowAngular.Service.EmployeeService;
import com.tvm.taskflowAngular.Service.ExcelImportService;
import com.tvm.taskflowAngular.Service.JobService;
import com.tvm.taskflowAngular.Service.LocationService;
import com.tvm.taskflowAngular.Service.SiteService;
import com.tvm.taskflowAngular.Service.TicketService;
import com.tvm.taskflowAngular.model.Client;
import com.tvm.taskflowAngular.model.Employee;
import com.tvm.taskflowAngular.model.ExcelImport;
import com.tvm.taskflowAngular.model.Jobs;
import com.tvm.taskflowAngular.model.Location;
import com.tvm.taskflowAngular.model.Site;
import com.tvm.taskflowAngular.model.Tickets;
import com.tvm.taskflowAngular.model.File.FileModel;
import com.tvm.taskflowAngular.model.File.FileRepository;
import com.tvm.taskflowAngular.model.File.FileService;
import com.tvm.taskflowAngular.web.Response;
import com.tvm.taskflowAngular.web.ResponseAPI;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

@Api(value = "TASKFLOWController", description = "REST Apis related to TASKFLOW Entity!!!!")
@org.springframework.web.bind.annotation.RestController
@CrossOrigin("http:localhost:4200")

@Validated
//use @Validated annotation on top of controller so it is applicable to all methods in it.
public class Controller {

	@Autowired
	EmployeeService employeeService;

	@Autowired
	ClientService clientService;

	@Autowired
	LocationService locationService;

	@Autowired
	SiteService siteService;

	@Autowired
	TicketService ticketService;

	@Autowired
	JobService jobService;

	@Autowired
	ExcelImportService excelImportService;
	
	@Autowired
	FileService fileRepository;
	
	private static Logger logger = Logger.getLogger(Controller.class);
	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@RequestMapping("/")
	public String index() {
		System.out.println("Index");
		return "Welcome to TASKFLOW Project !!! 8013";
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Employees")
	public ResponseAPI getAll() {
		logger.debug("Getting all Employees");
		logger.debug("message");
		logger.debug("message");
		logger.debug("message");
		List<Employee> employees = employeeService.findAll();
		//Response res = new Response("record counts : " + employees.size() +employees, Boolean.TRUE);
		ResponseAPI res1=new ResponseAPI("Success", Boolean.TRUE, employees, employees.size());
		return res1;
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})@GetMapping("/Employee/{id}")
	public Employee getById(
			@PathVariable @Min(value = 1, message = "id must be greater than or equal to 1") @Max(value = 100000000, message = "id must be lower than or equal to 100000000") Integer id) {
		logger.debug("Getting an Employee " + id);
		return employeeService.findOne(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/Employees")
	public Employee insert(@RequestBody Employee i) {
		logger.debug("Posting an Employee " + i.getFirstName());
		logger.debug("Posting an Employee " + i.getFirstName());

		return employeeService.save(i);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/employeesByName1.8/{name}")
	public List<Employee> EmployeeByRange(@PathVariable(value = "name") String name) {
		return employeeService.findAll().stream().filter(x -> x.getFirstName().equalsIgnoreCase(name))
				.collect(Collectors.toList());
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/employeeByName/{name}")
	public List<Employee> EmployeeByName(@PathVariable(value = "name") String name) {
		return employeeService.findByName(name);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	 @PutMapping("/Employee/{id}")
	 public Employee update(@PathVariable(value="id") Integer id,@RequestBody
	 Employee emp) {
	 logger.debug("Updating an Employee " +id);
	 return employeeService.update(emp);
	 }

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@DeleteMapping("/Employee/{id}")
	public Response delete(@PathVariable(value = "id") Integer id) {
		logger.debug("Deleting an Employee " + id);
		employeeService.delete(id);
		return new Response("Employee with id : " + id + " Deleted", Boolean.TRUE);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Locations")
	public List<Location> getAllLocation() {
		logger.debug("Getting all Locations");
		return locationService.findAll();
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Location/{id}")
	public Location getByIdLocation(@PathVariable(value = "id") Integer id) {
		logger.debug("Getting an location " + id);
		return locationService.findOne(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/Locations")
	public Location insert(@RequestBody Location i) {
		logger.debug("Posting an Client " + i.getLocationId());

		return locationService.save(i);
	}

	// @PutMapping("/Client/{id}")
	// public Client update(@PathVariable(value="id") Integer id,@RequestBody Client
	// emp) {
	// logger.debug("Updating an Client " +id);
	// return clientService.update(emp);
	// }

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@DeleteMapping("/Location/{id}")
	public void deleteLocation(@PathVariable(value = "id") Integer id) {
		logger.debug("Deleting an Location " + id);
		locationService.delete(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Clients")
	public List<Client> getAllClient() {
		logger.debug("Getting all Clients");
		System.out.println(clientService.findAll());
		return clientService.findAll();
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Client/{id}")
	public Client getByIdClient(@PathVariable(value = "id") Integer id) {
		logger.debug("Getting an Employee " + id);

		return clientService.findOne(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/Clients")
	public Client insert(@RequestBody Client i) {
		logger.debug("Posting an Client " + i.getFirstName());

		return clientService.save(i);
	}

	// @PutMapping("/Client/{id}")
	// public Client update(@PathVariable(value="id") Integer id,@RequestBody Client
	// emp) {
	// logger.debug("Updating an Client " +id);
	// return clientService.update(emp);
	// }

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@DeleteMapping("/Client/{id}")
	public void deleteClient(@PathVariable(value = "id") Integer id) {
		logger.debug("Deleting an Client " + id);
		clientService.delete(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Sites")
	public List<Site> getAllSite() {
		logger.debug("Getting all Sites");
		return siteService.findAll();
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Site/{id}")
	public Site getByIdSite(@PathVariable(value = "id") Integer id) {
		logger.debug("Getting an Site " + id);
		return siteService.findOne(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/Sites")
	public Site insert(@RequestBody Site i) {
		logger.debug("Posting an Site " + i.getSiteId());

		return siteService.save(i);
	}

	// @PutMapping("/Client/{id}")
	// public Client update(@PathVariable(value="id") Integer id,@RequestBody Client
	// emp) {
	// logger.debug("Updating an Client " +id);
	// return clientService.update(emp);
	// }

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@DeleteMapping("/Site/{id}")
	public void deleteSite(@PathVariable(value = "id") Integer id) {
		logger.debug("Deleting an Site " + id);
		siteService.delete(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Tickets")
	public List<Tickets> getAllTicket() {
		logger.debug("Getting all Tickets");
		return ticketService.findAll();
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Ticket/{id}")
	public Tickets getByIdTicket(@PathVariable(value = "id") String id) {
		logger.debug("Getting an Ticket " + id);
		return ticketService.findOne(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/Tickets")
	public Tickets insert(@RequestBody Tickets i) {
		logger.debug("Posting an Ticket " + i.getTicketId());

		return ticketService.save(i);
	}

	// @PutMapping("/Ticket/{id}")
	// public Client update(@PathVariable(value="id") Integer id,@RequestBody Ticket
	// emp) {
	// logger.debug("Updating an Ticket" +id);
	// return clientService.update(emp);
	// }

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@DeleteMapping("/Ticket/{id}")
	public void deleteTicket(@PathVariable(value = "id") String id) {
		logger.debug("Deleting an Ticket " + id);
		ticketService.delete(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Jobs")
	public List<Jobs> getAllJobs() {
		logger.debug("Getting all Jobs");
		return jobService.findAll();
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/Job/{id}")
	public Jobs getByIdJobs(@PathVariable(value = "id") Integer id) {
		logger.debug("Getting an Jobs " + id);
		return jobService.findOne(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/Jobs")
	public Jobs insert(@RequestBody Jobs i) {
		logger.debug("Posting an Job " + i.getJobId());

		return jobService.save(i);
	}

	// @PutMapping("/Ticket/{id}")
	// public Client update(@PathVariable(value="id") Integer id,@RequestBody Ticket
	// emp) {
	// logger.debug("Updating an Ticket" +id);
	// return clientService.update(emp);
	// }

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@DeleteMapping("/Job/{id}")
	public void deleteJob(@PathVariable(value = "id") Integer id) {
		logger.debug("Deleting an Job " + id);
		jobService.delete(id);
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/import")
	public List<ExcelImport> mapReapExcelDatatoDB(@RequestParam("file") MultipartFile reapExcelDataFile)
			throws IOException {
//-----------To save into POJO------------------
		List<ExcelImport> tempStudentList = new ArrayList<ExcelImport>();
		XSSFWorkbook workbook = new XSSFWorkbook(reapExcelDataFile.getInputStream());
		XSSFSheet worksheet = workbook.getSheetAt(0);

		for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
			ExcelImport tempStudent = new ExcelImport();

			XSSFRow row = worksheet.getRow(i);

			tempStudent.setEmpid((int) row.getCell(0).getNumericCellValue());
			tempStudent.setFirstName(row.getCell(1).getStringCellValue());
			tempStudent.setLastName(row.getCell(2).getStringCellValue());
			tempStudent.setMobile((int) row.getCell(3).getNumericCellValue());
			tempStudent.setEmail(row.getCell(4).getStringCellValue());
			tempStudent.setDesignation(row.getCell(5).getStringCellValue());
			tempStudent.setTotalDays((int) row.getCell(13).getNumericCellValue());
			tempStudent.setMonth(row.getCell(14).getStringCellValue());
			tempStudentList.add(tempStudent);
		}

		for (ExcelImport s : tempStudentList) {
			System.out.println(s.toString());
		}
		
		excelImportService.save(tempStudentList);
//----------To write in Internal Drive-----------------------------
		File convertFile =new File("C:/Users/rajue/Desktop/GitDownload/TaskFlow/TaskFlowAngular/src/main/resources" +reapExcelDataFile.getOriginalFilename());
		convertFile.createNewFile();
		try(FileOutputStream fout=new FileOutputStream(convertFile))
		{
			fout.write(reapExcelDataFile.getBytes());
			System.out.println("Successfully Saved!!!");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
//-------------To Store in DB-----------------------------
		FileModel filemode = new FileModel(reapExcelDataFile.getOriginalFilename(),reapExcelDataFile.getContentType(),reapExcelDataFile.getBytes());
		fileRepository.save(filemode);
//------------------------------------------
		ResponseAPI res1=new ResponseAPI("Success", Boolean.TRUE, tempStudentList, tempStudentList.size());
		
		
		
		return tempStudentList;
	}

	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/ExcelImport")
	public List<ExcelImport> getAllExcelImport() {
		logger.debug("Getting all ExcelImport");
		return excelImportService.findAll();
	}
	
	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@PostMapping("/upload")
	public String uploadMultipartFile(@RequestParam("uploadfile") MultipartFile file) {
		try {
			FileModel filemode = new FileModel(file.getOriginalFilename(),file.getContentType(),file.getBytes());
			fileRepository.save(filemode);
			return "File uploaded Successfully! , FileName =" +file.getOriginalFilename() +"; Id=" +filemode.getId();
		
		}
		catch (Exception e) {
			e.printStackTrace();
			return "Failed";
		}
	}
	
	@ApiOperation(value="",authorizations= {@Authorization(value="jwtToken")})
	@GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        // Load file from database
		Optional<FileModel> dbFile = fileRepository.getFile(fileId);
		
			FileModel newb = dbFile.get();
		
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(newb.getMimetype()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + newb.getName() + "\"")
                .body(new ByteArrayResource(newb.getFile()));
    }
}
