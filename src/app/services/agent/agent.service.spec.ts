import {TestBed, async, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AgentService} from './agent.service';
import {Agent} from "../../models/Agent";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from 'ng2-cookies';

fdescribe('сервис AgentService', () => {
  let agentService:AgentService;
  let httpMock:HttpTestingController;
  let cookieMock:CookieService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AgentService, CookieService]
    });

    agentService = TestBed.get(AgentService);
    httpMock = TestBed.get(HttpTestingController);
    cookieMock = TestBed.get(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
    cookieMock.set('token', '');
  });


  it('- Получение списка всех контрагентов', () => {
    const expectedAgents:Agent[] =
      [{
        id: 0, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
        unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
        rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
      }];

    cookieMock.set('token', 'tested');
    expect(cookieMock.get('token')).toBe('tested');

    agentService.getAllAgents().then(agents => {
      expect(agents.length).toBe(1);
      expect(agents).toEqual(expectedAgents);
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/');
    expect(request.request.method).toBe('GET');
    request.flush(expectedAgents);
  });

  it('- Получение списка всех контрагентов без прав доступа', () => {
    agentService.getAllAgents().catch(err => {
      expect(err.message).toEqual('Unauthorized user');
      expect(err.status).toEqual('401 Unauthorized');
      expect(err.code).toEqual(401);
    });
  });

  it('- Получение списка всех контрагентов, если получено исклюение от сервера', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    agentService.getAllAgents().catch(err => {
      expect(err).not.toBeNull();
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/');
    expect(request.request.method).toBe('GET');
    request.error(new ErrorEvent('error'));
  });

  it('- Получение контрагента по id', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent =
    {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.getAgentById(1).then(data => {
      expect(data.firstName).toBe(expectedAgent.firstName);
      expect(data).toEqual(expectedAgent);
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/1');
    expect(request.request.method).toBe('GET');
    request.flush(expectedAgent);
  });

  it('- Получение контрагента по id, если id меньше нуля', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    agentService.getAgentById(-1).catch(err => {
      expect(err.message).toEqual('Unprocessable Entity');
      expect(err.status).toEqual('422 Unprocessable Entity');
      expect(err.code).toEqual(422);
    });
  });

  it('- Получение контрагента по id без прав доступа', () => {
    agentService.getAgentById(1).catch(err => {
      expect(err.message).toEqual('Unauthorized user');
      expect(err.status).toEqual('401 Unauthorized');
      expect(err.code).toEqual(401);
    });
  });

  it('- Получение контрагента по id, если получено исклюение от сервера', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    agentService.getAgentById(1).catch(err => {
      expect(err).not.toBeNull();
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/1');
    expect(request.request.method).toBe('GET');
    request.error(new ErrorEvent('error'));
  });

  it('- Добавление нового контрагента', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.addAgent(expectedAgent).then(data => {
      expect(data.firstName).toBe(expectedAgent.firstName);
      expect(data).toEqual(expectedAgent);
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/');
    expect(request.request.method).toBe('POST');
    request.flush(expectedAgent);
  });

  it('- Добавление нового контрагента, если экземпляр является пустым', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');
    let agent:Agent;
    agentService.addAgent(agent).catch(err => {
      expect(err.message).toEqual('Conflict');
      expect(err.status).toEqual('409 Conflict');
      expect(err.code).toEqual(409);
    });
  });

  it('- Добавление нового контрагента без прав доступа', () => {
    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.addAgent(expectedAgent).catch(err => {
      expect(err.message).toEqual('Unauthorized user');
      expect(err.status).toEqual('401 Unauthorized');
      expect(err.code).toEqual(401);
    });
  });

  it('- Добавление нового контрагента, если получено исключение от сервера', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.addAgent(expectedAgent).catch(err => {
      expect(err).not.toBeNull();
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/');
    expect(request.request.method).toBe('POST');
    request.error(new ErrorEvent('error'));
  });

  it('- Редактирование контрагента', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.updateAgent(1, expectedAgent).then(data => {
      expect(data.firstName).toBe(expectedAgent.firstName);
      expect(data).toEqual(expectedAgent);
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/1');
    expect(request.request.method).toBe('PUT');
    request.flush(expectedAgent);
  });

  it('- Редактирование контрагента без прав доступа', () => {
    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.updateAgent(1, expectedAgent).catch(err => {
      expect(err.message).toEqual('Unauthorized user');
      expect(err.status).toEqual('401 Unauthorized');
      expect(err.code).toEqual(401);
    });
  });


  it('- Редактирование контрагента, если id меньше нуля', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.updateAgent(-1, expectedAgent).catch(err => {
      expect(err.message).toEqual('Unprocessable Entity');
      expect(err.status).toEqual('422 Unprocessable Entity');
      expect(err.code).toEqual(422);
    });
  });

  it('- Редактирование контрагента, если экземпляр является пустым', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');
    let agent:Agent;
    agentService.updateAgent(1, agent).catch(err => {
      expect(err.message).toEqual('Conflict');
      expect(err.status).toEqual('409 Conflict');
      expect(err.code).toEqual(409);
    });
  });

  it('- Редактирование контрагента, если получено исклюение от сервера', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.updateAgent(1, expectedAgent).catch(err => {
      expect(err).not.toBeNull();
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/1');
    expect(request.request.method).toBe('PUT');
    request.error(new ErrorEvent('error'));
  });

  it('- Удаление контрагента', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent =
    {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.deleteAgent(expectedAgent.id).then(data => {
      expect(data).toBe(1);
      expect(data).toEqual(expectedAgent.id);
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/1');
    expect(request.request.method).toBe('DELETE');
    request.flush(expectedAgent.id);
  });

  it('- Удаление контрагента без прав доступа', () => {
    agentService.deleteAgent(1).catch(err => {
      expect(err.message).toEqual('Unauthorized user');
      expect(err.status).toEqual('401 Unauthorized');
      expect(err.code).toEqual(401);
    });
  });

  it('- Удаление контрагента, если id меньше нуля', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    agentService.deleteAgent(-1).catch(err => {
      expect(err.message).toEqual('Unprocessable Entity');
      expect(err.status).toEqual('422 Unprocessable Entity');
      expect(err.code).toEqual(422);
    });
  });

  it('- Удаление контрагента, если получено исклюение от сервера', () => {
    cookieMock.set('token', 'tested')
    expect(cookieMock.get('token')).toBe('tested');

    const expectedAgent:Agent = {
      id: 1, firstName: 'testFirstName', middleName: 'testMiddleName', lastName: 'testLastName',
      unp: 'testUnp', organization: 'testOrganization', position: 'testPosition', address: 'testAddress',
      rs: 'testRs', ks: 'testKs', bank: 'testBank', bik: 'testBit', phone: 'testPhone'
    };

    agentService.deleteAgent(1).catch(err => {
      expect(err).not.toBeNull();
    });

    const request = httpMock.expectOne('http://localhost:8081/agents/1');
    expect(request.request.method).toBe('DELETE');
    request.error(new ErrorEvent('error'));
  });



});
