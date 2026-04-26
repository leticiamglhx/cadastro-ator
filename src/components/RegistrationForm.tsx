import * as React from 'react'
import {
  Box,
  TextField,
  Stack,
  Typography,
  Button,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

// Configura o idioma do calendário
dayjs.locale('pt-br')

export default function RegistrationForm() {
  const [step, setStep] = React.useState(1)

  // Estados do Passo 1
  const [fullName, setFullName] = React.useState('')
  const [birthDate, setBirthDate] = React.useState<dayjs.Dayjs | null>(null)
  const [documentType, setDocumentType] = React.useState<string | null>(null)
  const [documentNumber, setDocumentNumber] = React.useState('')
  const [organizationName, setOrganizationName] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [whatsapp, setWhatsapp] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [city, setCity] = React.useState('')
  const [state, setState] = React.useState('')
  const [cep, setCep] = React.useState('')

  // Estados de Erro
  const [fullNameError, setFullNameError] = React.useState(false)
  const [birthDateError, setBirthDateError] = React.useState(false)
  const [whatsappError, setWhatsappError] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const [cityError, setCityError] = React.useState(false)
  const [stateError, setStateError] = React.useState(false)
  const [cepError, setCepError] = React.useState(false)
  const [organizationNameError, setOrganizationNameError] = React.useState(false)
  const [positionError, setPositionError] = React.useState(false)

  // Estados do Passo 2
  const [actorType, setActorType] = React.useState<string[]>([])
  const [ecosystemProfile, setEcosystemProfile] = React.useState<string[]>([])
  const [involvementLevel, setInvolvementLevel] = React.useState<string | null>(null)
  const [contributions, setContributions] = React.useState<string[]>([])

  // Opções
  const documentTypeOptions = ['CPF', 'CNPJ']
  const actorTypeOptions = ['Empreendedor', 'Startup', 'Empresa', 'Investidor', 'Governo', 'Universidade', 'Instituição de ensino', 'Organização da sociedade civil', 'Profissional independente', 'Estudante', 'Outro']
  const ecosystemProfileOptions = ['Empreendedor', 'Gestor público', 'Pesquisador', 'Investidor', 'Mentor', 'Educador', 'Estudante', 'Profissional do setor']
  const involvementLevelOptions = ['Muito ativo', 'Moderadamente ativo', 'Pouco ativo', 'Ainda não participo, mas gostaria']
  const contributionsOptions = ['Mentorias', 'Eventos', 'Projetos de inovação', 'Investimentos', 'Capacitações', 'Articulação institucional', 'Desenvolvimento tecnológico', 'Pesquisa', 'Outros']

  const showContributions = involvementLevel === 'Muito ativo' || involvementLevel === 'Moderadamente ativo'

  // Funções Auxiliares de Documento
  const getDocumentLabel = () => documentType === 'CNPJ' ? 'CNPJ' : 'CPF'
  const getDocumentPlaceholder = () => documentType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'
  const getDocumentHelperText = () => documentType ? `Por questões de LGPD, o ${documentType} não é obrigatório.` : ''

  const handleDocumentTypeChange = (_event: any, newValue: string | null) => {
    setDocumentType(newValue)
    setDocumentNumber('')
    setOrganizationName('')
    setPosition('')
    setOrganizationNameError(false)
    setPositionError(false)
  }

  const validateStep1 = () => {
    let isValid = true
    if (!fullName) { setFullNameError(true); isValid = false }
    if (!birthDate) { setBirthDateError(true); isValid = false }
    if (!whatsapp) { setWhatsappError(true); isValid = false }
    if (!email) { setEmailError(true); isValid = false }
    if (!city) { setCityError(true); isValid = false }
    if (!state) { setStateError(true); isValid = false }
    if (!cep) { setCepError(true); isValid = false }

    if (documentType === 'CNPJ') {
      if (!organizationName) { setOrganizationNameError(true); isValid = false }
      if (!position) { setPositionError(true); isValid = false }
    }
    return isValid
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2)
  }

  const handleBack = () => setStep(1)

  const handleContributionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    setContributions((prev) => checked ? [...prev, value] : prev.filter((c) => c !== value))
  }

  const handleSubmit = async () => {
    const formData = {
      fullName,
      birthDate: birthDate?.format('YYYY-MM-DD'),
      documentType,
      documentNumber,
      ...(documentType === 'CNPJ' && { organizationName, position }),
      whatsapp,
      email,
      city,
      state,
      cep,
      actorType,
      ecosystemProfile,
      involvementLevel,
      contributions: showContributions ? contributions : [],
    }
    console.log('Dados Enviados:', formData)
    alert('Formulário enviado! Verifique o console.')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto', my: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Formulário de Registro
        </Typography>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          {step === 1 && (
            <Stack spacing={2}>
              <TextField
                fullWidth label="Nome completo"
                value={fullName} onChange={(e) => { setFullName(e.target.value); setFullNameError(false); }}
                error={fullNameError} helperText={fullNameError ? 'Nome completo é obrigatório' : ''}
              />

              <DatePicker
                label="Data de nascimento"
                value={birthDate}
                onChange={(newValue) => { setBirthDate(newValue); setBirthDateError(false); }}
                slotProps={{
                  textField: { 
                    fullWidth: true, 
                    error: birthDateError, 
                    helperText: birthDateError ? 'Data de nascimento é obrigatória' : '' 
                  }
                }}
              />

              <Autocomplete
                options={documentTypeOptions}
                value={documentType}
                onChange={handleDocumentTypeChange}
                renderInput={(params) => <TextField {...params} label="Tipo de Documento" />}
              />

              {documentType && (
                <TextField
                  fullWidth label={getDocumentLabel()}
                  placeholder={getDocumentPlaceholder()}
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  helperText={getDocumentHelperText()}
                />
              )}

              {documentType === 'CNPJ' && (
                <Stack spacing={2}>
                  <TextField
                    fullWidth label="Nome da organização"
                    value={organizationName} onChange={(e) => { setOrganizationName(e.target.value); setOrganizationNameError(false); }}
                    error={organizationNameError} helperText={organizationNameError ? 'Obrigatório' : ''}
                  />
                  <TextField
                    fullWidth label="Cargo/Função"
                    value={position} onChange={(e) => { setPosition(e.target.value); setPositionError(false); }}
                    error={positionError} helperText={positionError ? 'Obrigatório' : ''}
                  />
                </Stack>
              )}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                    fullWidth label="WhatsApp" value={whatsapp} 
                    onChange={(e) => { setWhatsapp(e.target.value); setWhatsappError(false); }}
                    error={whatsappError}
                />
                <TextField 
                    fullWidth label="E-mail" value={email} 
                    onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                    error={emailError}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField fullWidth label="Cidade" value={city} onChange={(e) => setCity(e.target.value)} error={cityError}/>
                <TextField fullWidth label="Estado" value={state} onChange={(e) => setState(e.target.value)} error={stateError}/>
                <TextField fullWidth label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} error={cepError}/>
              </Stack>
            </Stack>
          )}

          {step === 2 && (
            <Stack spacing={3}>
              <Autocomplete
                multiple
                options={actorTypeOptions}
                value={actorType}
                onChange={(_, val) => setActorType(val)}
                renderInput={(params) => <TextField {...params} label="Tipo de Ator" />}
              />

              <Autocomplete
                multiple
                options={ecosystemProfileOptions}
                value={ecosystemProfile}
                onChange={(_, val) => setEcosystemProfile(val)}
                renderInput={(params) => <TextField {...params} label="Perfil no Ecossistema" />}
              />

              <FormControl fullWidth>
                <InputLabel>Nível de Envolvimento</InputLabel>
                <Select
                  value={involvementLevel || ''}
                  label="Nível de Envolvimento"
                  onChange={(e) => setInvolvementLevel(e.target.value)}
                >
                  {involvementLevelOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {showContributions && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Contribuições ao Ecossistema</Typography>
                  <FormGroup sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    {contributionsOptions.map((opt) => (
                      <FormControlLabel
                        key={opt}
                        control={<Checkbox checked={contributions.includes(opt)} onChange={handleContributionsChange} value={opt} />}
                        label={<Typography variant="body2">{opt}</Typography>}
                      />
                    ))}
                  </FormGroup>
                </Box>
              )}
            </Stack>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            {step > 1 && <Button onClick={handleBack} variant="outlined">Voltar</Button>}
            <Box sx={{ flexGrow: 1 }} />
            {step === 1 ? (
              <Button onClick={handleNext} variant="contained">Próximo</Button>
            ) : (
              <Button onClick={handleSubmit} variant="contained" color="success">Finalizar</Button>
            )}
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  )
}